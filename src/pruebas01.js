var suma = 0;
process.stdout.write("Escriba una lista de numeros. Punto para finalizar \n");

process.stdin.on("data", function(data) {
	if (data.toString().trim() == '.') {
		console.log(data);
		process.exit();
	} else {
		suma = suma + parseInt(data.toString().trim());
		console.log(suma);
	}
});

process.on("exit", () => {
	process.stdout.write("la suma total es: " + suma);
});