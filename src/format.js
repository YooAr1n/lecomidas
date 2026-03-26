// format.js

const commaRegex = /\B(?=(\d{3})+(?!\d))/g;

function toNum(x) {
  if (x && typeof x.toNumber === 'function') return x.toNumber();
  return Number(x) || 0;
}

window.addCommas = function(s) {
  return String(s).replace(commaRegex, ",");
};

window.commaFormat = function(numIn, precision = 0) {
  const num = toNum(numIn);
  return num.toLocaleString(undefined, { 
    minimumFractionDigits: precision, 
    maximumFractionDigits: precision 
  });
};

window.regularFormat = function(numIn, precision = 2) {
  return toNum(numIn).toFixed(precision);
};

window.format = function(numIn, precision = 2) {
  const num = toNum(numIn);
  
  if (!isFinite(num)) return "✨ (INFINITY!)";
  if (isNaN(num)) return "☠️ (NOT A NUMBER!)";

  // Case A: Everything under 1 Million (including Thousands)
  // This will return "999,999.00" instead of "999.99K"
  if (num < 1000000) {
    return window.commaFormat(num, precision);
  }

  // Case B: M, B, T, etc. (Starting from 1,000,000 to 999.99No)
  const suffixes = ["", "", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
  const tier = Math.floor(Math.log10(num) / 3);

  if (tier < suffixes.length) {
    const suffix = suffixes[tier]; 
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    
    return window.regularFormat(scaled, precision) + suffix;
  }

  // Case C: Scientific Notation (at 10^33 (1Dc))
  const e = Math.floor(Math.log10(num));
  const m = num / Math.pow(10, e);
  return window.regularFormat(m, precision) + "e" + e;
};

window.formatWhole = function formatWhole(numIn, precision = 2) {
    const num = toNum(numIn);
    if (num < 1e6) return format(num, 0)
    return format(num, precision);
  };