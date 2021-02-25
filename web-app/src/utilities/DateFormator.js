export default function DateFormator() {
    return "";
}

export function CardDate(date) {
    var seconds = Math.floor((new Date(Date.now()) - new Date(date)) / 1000);

    let interval = 604800; //60sec * 60minutes * 24hours * 7days || 1 week
    if (seconds > interval) {
        let dateString = new Date(date).toDateString();
        return dateString;
    }
    interval = seconds / 86400; //60sec * 60minutes * 24hours || 1 days
    if (interval > 1 && interval < 2) {
        return " Yesterday";
    }
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; // 1 hour
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60; // 1 minutes
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}