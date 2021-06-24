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

    const hours = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
    }).format(date);
    const minutes = new Intl.DateTimeFormat("en-in", {
        timeZone: "Asia/Kolkata",
        minute: "numeric",
    }).format(date);

    date = day + "-" + month + "-" + year + " at " + hours + ":" + minutes;

    console.log(date);

    return date;
}
