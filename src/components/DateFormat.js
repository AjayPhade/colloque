export default function dateFormat(date) {
    const year = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
    }).format(date);

    const month = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        month: "2-digit",
    }).format(date);

    const day = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
    }).format(date);

    const time = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);

    date = day + "-" + month + "-" + year + " at " + time.toUpperCase();

    return date;
}
