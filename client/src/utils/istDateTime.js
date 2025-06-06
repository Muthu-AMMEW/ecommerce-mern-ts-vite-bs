export function istDateTime(utcString) {
    const istDate = new Date(utcString).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata", // IST timezone
        hour12: true,             // optional: for 12-hour format
    });
    return istDate
}