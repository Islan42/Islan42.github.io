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
	
	$('#findPerson').submit(function(event) {
		event.preventDefault()
		
		const nome = $('#nomePessoa').val();
		$('#nomePessoa').prop('value', '');
		
		if(nome === 'ISLAN VICTHOR'){
			carregar(1000)
			.then((v) => {
				loadPaginaUm();		
			})			
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
	
	carregar(1000)
	.then((v) => {
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

function carregar(tempo){
	return new Promise((resolve, reject) => {
		console.log('Loading')
		
		setTimeout(()=>{
			resolve('Finished')
		}, tempo)
		
	})
}