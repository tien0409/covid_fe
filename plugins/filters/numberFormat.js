/**
 * @param   {number} number
 * @returns {string}
 */
export default function (number) {
    return number ? parseInt(number).toLocaleString('de-DE') : '0'
}
