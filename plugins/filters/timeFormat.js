/**
 * @param {string} seconds
 */
export default function (seconds) {
    const timeString = new Date(seconds * 1000).toISOString().substr(11, 8);

    return timeString.substring(0, 3) === '00:' ? timeString.slice(3, 8) : timeString;
}
