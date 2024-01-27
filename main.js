const mainElement = document.querySelector('main');

loadPaginaZero();

let pagina = 0;

function loadPaginaZero(){
	apagarConteudo(mainElement)
	
	mainElement.innerHTML = `
		<div class="mx-auto max-w-2xl  bg-zinc-300 mt-8 p-4">
			<h1 >Sistema de Inteligência Nacional</h1>
			<form action="/">
				<label for="nome">
					Buscar: 
					<input type="text" id="nome">
				</label>
			</form>
		</div>
	`
}

function loadPaginaUm(){
	
}

function apagarConteudo(elemento){
	while(elemento.firstChild){
		elemento.removeChild(elemento.firstChild);
	}
}