module.exports.convertTime = (timeInSeconds) => {
	let time = "";
	
	const days = Math.floor(timeInSeconds / 86400);
	const hours = Math.floor((timeInSeconds - (Math.floor(timeInSeconds / 86400) * 86400)) / 3600);
	const min = Math.floor((timeInSeconds - (Math.floor(timeInSeconds / 3600) * 3600)) / 60);
	const seconds = Math.floor(timeInSeconds % 60)
	
	if (days > 0) time += days + ((days > 1) ? " jours" : " jour");
	if (hours > 0) time += (days > 0) ? ", " + hours + ((hours > 1) ? " heures" :  " heure") : hours + ((hours > 1) ? " heures" :  " heure");
	if (min > 0) time += (hours > 0 || days > 0) ? ", " + min + ((min > 1) ? " minutes" : " minute") : min + ((min > 1) ? " minutes" : " minute");
	if (seconds > 0) time += (hours > 0 || days > 0 || min > 0) ? ", " + seconds + ((seconds > 1) ? " secondes" : " seconde") : seconds + ((seconds > 1) ? " secondes" : " seconde");
	
	return time;
};