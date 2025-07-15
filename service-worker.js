<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>حاسبة الفرق الزمني</title>
  <link rel="manifest" href="manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="حاسبتي">
  <link rel="apple-touch-icon" href="icon-180x180.png">
  <meta name="theme-color" content="#007BFF">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      padding: 20px;
      direction: rtl;
      text-align: right;
    }
    h1 {
      text-align: center;
    }
    input, button {
      padding: 10px;
      margin: 5px 0;
      font-size: 16px;
      width: 100%;
    }
    .result {
      background-color: #fff;
      padding: 10px;
      margin-top: 10px;
      border-radius: 6px;
      border: 1px solid #ddd;
      cursor: pointer;
    }
    .notice {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 20px;
    }
    .link-button {
      display: block;
      text-align: center;
      background-color: #007BFF;
      color: white;
      padding: 10px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .link-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <h1>حاسبة الفرق الزمني</h1>
  <div class="section">
    <label>من:</label>
    <input type="date" id="startDate">
    <label>إلى:</label>
    <input type="date" id="endDate">
    <button onclick="calculateDifference()">احسب الفرق</button>
    <div class="notice" id="diffNotice"></div>
  </div>
  <div class="section" id="diffResults" style="display: none;">
    <div class="result" onclick="copyText(this)">عدد السنوات<br><b id="years"></b></div>
    <div class="result" onclick="copyText(this)">عدد الشهور<br><b id="months"></b></div>
    <div class="result" onclick="copyText(this)">عدد الأيام<br><b id="days"></b></div>
  </div>
  <div class="section">
    <label>ادخل رقم للقسمة:</label>
    <input type="number" id="divisionInput">
    <button onclick="calculateDivision()">احسب القسمة</button>
    <div class="result" id="divisionResult" style="display: none;" onclick="copyText(this)"></div>
    <div class="notice" id="divNotice"></div>
  </div>
  <a class="link-button" href="second.html">🔁 الانتقال إلى حاسبة الضرب</a>

  <script>
    // تعيين تاريخ اليوم في الحقل "من"
    document.getElementById("startDate").value = new Date().toISOString().split('T')[0];

    function calculateDifference() {
      const start = new Date(document.getElementById("startDate").value);
      const end = new Date(document.getElementById("endDate").value);
      const notice = document.getElementById("diffNotice");
      notice.innerText = "";

      if (isNaN(start) || isNaN(end)) {
        notice.innerText = "يرجى اختيار تاريخين صحيحين";
        return;
      }

      const diffTime = Math.abs(end - start);
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      document.getElementById("days").innerText = days;
      document.getElementById("months").innerText = months;
      document.getElementById("years").innerText = years;
      document.getElementById("diffResults").style.display = "block";
    }

    function calculateDivision() {
      const input = parseFloat(document.getElementById("divisionInput").value);
      const days = parseFloat(document.getElementById("days").innerText);
      const notice = document.getElementById("divNotice");
      notice.innerText = "";

      if (isNaN(input) || isNaN(days) || days === 0) {
        notice.innerText = "يرجى إدخال رقم صالح بعد حساب الفرق";
        return;
      }

      const result = (input / days).toFixed(8);
      const trimmed = trimToFirst2NonZero(result);
      const box = document.getElementById("divisionResult");
      box.innerText = trimmed;
      box.style.display = "block";
    }

    function trimToFirst2NonZero(value) {
      const decimal = value.split(".")[1] || "";
      let output = "0.";
      let count = 0;
      for (let ch of decimal) {
        output += ch;
        if (ch !== "0") count++;
        if (count === 2) break;
      }
      return output;
    }

    function copyText(element) {
      const text = element.innerText.split("\n")[1] || element.innerText;
      navigator.clipboard.writeText(text);
    }
  </script>
</body>
</html>
