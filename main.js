let agente;
let pessoa;

homepage();

function homepage(){
	$('main').empty();
	
	$('#command-line').attr('disabled', true)
	$('#command-line').prop('value', '')
	
	$('main').html(`
		<div class="mx-auto max-w-xl  bg-zinc-300 mt-8 p-4">
			<img src="src/img/SNI_logo_black.png" class="my-4 mx-auto h-48">
			<h2 class="text-center font-bold text-black">Cadastro Nacional de Pessoas Fuleiras</h2>
			<form action="/" id="login" class="text-black mt-4 mx-auto max-w-80">
				<div class="flex items-center">
					<input type="text" id="agente" placeholder="AGENTE" name="agente" class="px-2 py-1 w-full">
				</div>
			</form>
		</div>
	`);
	
	$('#agente').focus();
	
	$('#agente').keyup(function(event) {
		const value = $(this).prop('value');
		$(this).prop('value', value.toUpperCase())
	})
	
	$('#login').submit(async function(event) {
		event.preventDefault()
		
		agente = $('#agente').val().toUpperCase();
		$('#agente').prop('value', '');
		$('#agente').attr('disabled', true);
		
		await carregar(500)
		$('main').css('background-image', 'url("src/img/SNI_logo_white.png")');
		$('main').addClass('bg-contain bg-no-repeat bg-center');
		buscar_index();
	})	
}

function buscar_index(){
	$('main').empty();
	
	$('#command-line').attr('disabled', true)
	$('#command-line').prop('value', '')
	
	$('main').html(`
		<div class="mx-auto max-w-xl  bg-zinc-300 mt-8 p-4">
			<img src="src/img/SNI_logo_black.png" class="my-4 mx-auto h-48">
			<h2 class="text-center font-bold text-black">Cadastro Nacional de Pessoas Fuleiras</h2>
			<form action="/" id="findPerson" class="text-black mt-4 mx-auto max-w-80">
				<input type="text" id="nomePessoa" name="nomePessoa" placeholder="BUSCAR" class="px-2 py-1 w-full">
			</form>
		</div>
	`);
	
	statusDiv();
	
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
		if(nome.toUpperCase() === 'ISLAN VICTHOR'){						
			pessoa = await getJSONPromise('src/pessoas/islan_victhor.json');
			await carregar(1000)
			buscar_result(pessoa)
		} else {
			await flashMessage('NENHUM RESULTADO ENCONTRADO', 'RED', 800);
			$('#nomePessoa').attr('disabled', false);
			$('#nomePessoa').focus();
		}
	})
}

function buscar_result(pessoa){
	$('main').empty();
	
	$('main').html(`
		<div class="flex items-center">
			<div class="p-4">
				<img src="public/islan.png">
			</div>
			<div class="p-4">
				<p>${pessoa.resumo}</p>
			</div>
		</div>
	`)
	
	$('#command-line').attr('disabled', false);
	$('#command-line').prop('value', '');
	$('#command-line').focus();
	
	statusDiv();
	
	$('#command-line').keyup(function(event) {
		const value = $(this).prop('value');
		$(this).prop('value', value.toUpperCase())
	})
	
	$('footer form').submit(async function(event){
		event.preventDefault();
		
		const comando = $('#command-line').val();
		$('#command-line').prop('value', '');
		$('#command-line').attr('disabled', true);
		
		if(comando.toUpperCase() === 'PROFILE'){
			popup_senha(pessoa.senha, async function(){
				await carregar(2000);
				profile(pessoa);				
			}, function(){
				$('#command-line').attr('disabled', false);
				$('#command-line').focus();
			});
		} else {
			$('#command-line').attr('disabled', false);
			$('#command-line').focus();
		}
	});
}

function profile(pessoa){
	$('main').empty();
	
	$('main').html(`
		<div class="flex items-center  h-full">
			<div class="p-4">
				<img src="public/islan.png">
			</div>
			<div class="p-4  h-full overflow-auto">
				<div class="p-4 bg-zinc-300">
					<p>${pessoa.introducao}</p>
				</div>
				<div id="habilidades" class="bg-zinc-300 mt-2 p-2 text-black">
					<h2 class="text-center">Habilidades e Conhecimentos</h2>
					<table class="border-separate border border-black bg-white">
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	`)
	
	pessoa.habilidades.forEach((habilidade) => {
		$('#habilidades table tbody').append(`
			<tr>
				<td class="border border-black  p-1">${habilidade[0]}</td>
				<td class="border border-black  p-1">${habilidade[1]}</td>
			</tr>
		`);
	});
	
	statusDiv();
}

async function carregar(tempo){
	let counter = 0
	const intervalValue = tempo/12;
	
	$('main').append(`
		<div class="mx-auto mt-6 max-w-xl text-center" id="msgCarregando">
			<p>Carregando</p>
			<p id="msgCarregandoStatus">----------</p>
		</div>
	`);
	
	const interval = setInterval(() =>{
		const msg = counter < 11 ? 'X'.repeat(counter) +  '-'.repeat(10-counter++) : 'X'.repeat(10);
		if($('#msgCarregandoStatus')){
			$('#msgCarregandoStatus').text(msg)
		}
	}, intervalValue);
	
	await delay(tempo);
	
	clearInterval(interval);
	
	$('#msgCarregando').remove();
}

function flashMessage(msg, color, tempo){
	const COLORS = {GREEN: 'bg-emerald-600', RED: 'bg-red-600'}
	$('main').append(`
		<div id="flashMessage" class="w-80 min-h-12 mt-8 leading-10 text-2xl text-white ${COLORS[color]}  border-4 border-double border-white  mx-auto text-center">
			<p>${msg}</p>
		</div>
	`);
	
	return delay(tempo).then(function() {		
		$('#flashMessage').remove();
	})
}

function delay(tempo){
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), tempo);
	})
}

function getJSONPromise(url){
	return new Promise((resolve, reject) => {
		$.getJSON(url, function(data){
			resolve(data);
		});
	});
}

function popup_senha(senha, next, prev){
	$('main').append(`
		<div id="popupSenha" class="w-96 mt-8 mx-auto bg-zinc-300 border-4 border-double border-white p-2 text-black text-xl text-center relative">
			<h2>DIGITE A SENHA DE ACESSO PARA PROSSEGUIR</h2>
			<form id="formSenha">
				<input type="password" id="senha" name="senha" placeholder="SENHA" class="p-2 mt-4 w-full">
			</form>
			<button id="closeBtn"class="absolute right-1 top-1 cursor-default"><img src="src/img/closebtn.png"></button>
		</div>
	`);
	
	$('#senha').focus();
	
	$('#formSenha').submit(function(event){
		event.preventDefault();
		
		const res = $('#senha').val()
		$('#senha').attr('disabled', true)
		
		if(res === senha){
			next();
		} else {
			$('#senha').prop('value', '');
			$('#senha').attr('disabled', false);
			$('#senha').focus();
		}
	});
	
	$('#closeBtn').on('click', function(event){
		$('#popupSenha').remove();
		prev();
	});
	
	$('#popupSenha').on('keydown', function(event){
		if(event.key === "Escape"){
			$('#popupSenha').remove();
			prev();
		}
	});
}

function statusDiv(){
	$('main').append(`
		<div class="absolute top-8 left-0 text-xs bg-white/10 p-2">
			<p>AGENT: ${agente}</p>
		</div>
	`);
}