export const secToMin = (secs: number) => {
    const totalMinutes = Math.round(secs / 60)
    const hours = Math.round(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours !== 0 ? hours.toString().padStart(2, "0")+'tuntia ' : ''}${minutes.toString().padStart(2, "0")}min.`
}

export const mToKm = (meters: number) => {
    const km: number = (meters/1000)
    return `${km.toFixed(2)}km.`
}