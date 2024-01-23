const rates = {
  onPeak: 0.132,
  offPeak: 0.065,
};

const calculateBillData = (onPeakKwh, offPeakKwh, province) => {
  const onPeakTotal = onPeakKwh * rates.onPeak;
  const offPeakTotal = offPeakKwh * rates.offPeak;
  const grossTotal = onPeakTotal + offPeakTotal;

  let rebate;

  switch (province) {
    case "BC":  
      rebate = (8 / 100) * grossTotal;
      break;

    default:
      rebate = 0;
      break;
  }

  const tax = (13 / 100) * (grossTotal);
  const toPay = grossTotal + tax - rebate;

  return { onPeakTotal, offPeakTotal, grossTotal, tax, rebate, toPay };
};

const displayData = () => {
  const result = document.querySelector(".result");
  const onPeakKwh = Number(document.querySelector("#peak-kwh").value);
  const offPeakKwh = Number(document.querySelector("#off-peak-kwh").value);
  const province = document.querySelector("#province").value;

  const { onPeakTotal, offPeakTotal, grossTotal, tax, rebate, toPay } =
    calculateBillData(onPeakKwh, offPeakKwh, province);

  result.innerHTML = ` 
    <div class="breakdown">
      <div class="on-peak">
        <p>ON PEAK USAGE</p>
        <p class="focus-amount">$${onPeakTotal.toFixed(2)}</p>
        <p>${onPeakKwh}kWh @$${rates.onPeak}/hr</p>
      </div>
      <div class="off-peak">
        <p>OFF PEAK USAGE</p>
        <p class="focus-amount">$${offPeakTotal.toFixed(2)}</p>
        <p>${offPeakKwh}kWh @$${rates.offPeak}/hr</p>
      </div>
    </div>
    <p>
      Total consumption charges: $${grossTotal.toFixed(2)} <br />
      Sales Tax (13%): $${tax.toFixed(2)} <br />
      Provincial rebate: -$${rebate.toFixed(2)}
    </p>
    <div class="total-to-pay">
      <p>TOTAL TO PAY</p>
      <p class="focus-amount">$${toPay.toFixed(2)}</p>
    </div>
  `;
};

document.querySelector("button").addEventListener("click", displayData);