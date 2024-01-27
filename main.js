const mainElement = document.querySelector('main');

loadPaginaZero();

let pagina = 0;

function loadPaginaZero(){
	apagarConteudo(mainElement)
	
	mainElement.innerHTML = `
		<div class="mx-auto max-w-2xl  bg-zinc-300 mt-8 p-4">
			<h1 >Sistema de Inteligência Nacional</h1>
			<form action="/" id="findPerson" class="text-black">
				<label for="nomePessoa">
					Buscar: 
					<input type="text" id="nomePessoa" name="nomePessoa">
				</label>
			</form>
		</div>
	`
	
	$('#nomePessoa').focus();
	
	$('#nomePessoa').keyup(function(event) {
		const value = $(this).prop('value');
		$(this).prop('value', value.toUpperCase())
	})
	
	$('#findPerson').submit(async function(event) {
		event.preventDefault()
		
		const nome = $('#nomePessoa').val();
		$('#nomePessoa').prop('value', '');
		$('#nomePessoa').attr('disabled', true);
		
		await carregar(1000)
		if(nome === 'ISLAN VICTHOR'){
			await carregar(1000)
			loadPaginaUm()
		} else {
			$('#nomePessoa').attr('disabled', false);
			$('#nomePessoa').focus();
		}
	})
	
}

function loadPaginaUm(){
	apagarConteudo(mainElement)
	
	mainElement.innerHTML = `
		<div class="flex">
			<img src="girassol.webp">
			<div>
				<p>Praticamente inofensivo.</p>
			</div>
		</div>
	`
	
	carregar(5000)
	.then(() => {
		loadPaginaDois();
	})
}

function loadPaginaDois(){
	apagarConteudo(mainElement);
	
	mainElement.innerHTML = `
		<div class="flex">
			<img src="girassol.webp">
			<div>
				<p>Olá. Meu nome é Islan Victhor, tenho 24 anos, e sou estudante de Ciência da Computação. Atualmente busco insersão na área de Desenvolvimento Web.</p>
				
				<h2>Habilidades e Conhecimentos</h2>
				<ul>
					<li>JavaScript</li>
					<li>Express.Js</li>
					<li>Vue</li>
					<li>React</li>
					<li>jQuery</li>
					<li>PHP</li>
					<li>Laravel</li>
					<li>Python</li>
					<li>Flask</li>
					<li>C#</li>
					<li>Docker</li>
					<li>MySQL</li>
					<li>MongoDB</li>
				</ul>
			</div>
		</div>
	`
}

function apagarConteudo(elemento){
	while(elemento.firstChild){
		elemento.removeChild(elemento.firstChild);
	}
}

async function carregar(tempo){
	let counter = 0
	const intervalValue = tempo/12;
	
	const interval = setInterval(() =>{
		const msg = counter < 11 ? 'X'.repeat(counter) +  '-'.repeat(10-counter++) : 'X'.repeat(10);
		console.log(msg)
	}, intervalValue);
	
	await new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve()
		}, tempo)		
	})
	
	clearInterval(interval);
}