let agente;

homepage();

function homepage(){
	$('main').empty();
	
	$('#command-line').attr('disabled', true)
	$('#command-line').prop('value', '')
	
	$('main').html(`
		<div class="mx-auto max-w-xl  bg-zinc-300 mt-8 p-4">
			<img src="public/SNI_logo_black.png" class="my-4 mx-auto h-48">
			<h2 class="text-center font-bold text-black">Cadastro Nacional de Pessoas Fuleiras</h2>
			<form action="/" id="login" class="text-black mt-4 mx-auto max-w-80">
				<div class="flex items-center">
					<input type="text" id="agente" placeholder="AGENTE" name="agente" class="px-2 py-1 w-full">
				</div>
			</form>
		</div>
	`);
	
	flashMessage('TESTE', 'RED');
	
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
		$('main').css('background-image', 'url("public/SNI_logo_white.png")');
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
			<img src="public/SNI_logo_black.png" class="my-4 mx-auto h-48">
			<h2 class="text-center font-bold text-black">Cadastro Nacional de Pessoas Fuleiras</h2>
			<form action="/" id="findPerson" class="text-black mt-4 mx-auto max-w-80">
				<input type="text" id="nomePessoa" name="nomePessoa" placeholder="BUSCAR" class="px-2 py-1 w-full">
			</form>
		</div>
		<span class="absolute top-8 left-0  text-xs">AGENT: ${agente}</span>
	`);
	
	
	
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
			await carregar(1000)
			buscar_result()
		} else {
			$('#nomePessoa').attr('disabled', false);
			$('#nomePessoa').focus();
		}
	})
}

function buscar_result(){
	$('main').empty();
	
	$('main').html(`
		<div class="flex items-center">
			<div class="p-4">
				<img src="public/islan.png">
			</div>
			<div class="p-4">
				<p>Praticamente inofensivo.</p>
			</div>
		</div>
	`)
	
	$('#command-line').attr('disabled', false);
	$('#command-line').prop('value', '');
	$('#command-line').focus();
	
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
			await carregar(2000);
			profile();
		} else {
			$('#command-line').attr('disabled', false);
			$('#command-line').focus();
		}
	});
}

function profile(){
	$('main').empty();
	
	$('main').html(`
		<div class="flex items-center  h-full">
			<div class="p-4">
				<img src="public/islan.png">
			</div>
			<div class="p-4  h-full overflow-auto">
				<div class="p-4 bg-zinc-300">
					<p>Olá. Meu nome é Islan Victhor, tenho 24 anos, e sou estudante de Ciência da Computação. Atualmente busco insersão na área de Desenvolvimento Web.</p>
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
	
	$.getJSON('habilidades.json', function(data){
		$.each(data, function(i, habilidade){
			$('#habilidades table tbody').append(`
				<tr>
					<td class="border border-black  p-1">${habilidade[0]}</td>
					<td class="border border-black  p-1">${habilidade[1]}</td>
				</tr>
			`)
		})
	})
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
	
	await new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve()
		}, tempo)		
	})
	
	clearInterval(interval);
	
	$('#msgCarregando').detach();
}

function flashMessage(msg, color){
	const COLORS = {GREEN: 'bg-emerald-600', RED: 'bg-red-600'}
	$('main').append(`
		<div id="flashMessage" class="w-80 h-12 mt-8 leading-10 text-2xl text-white ${COLORS[color]}  border-4 border-double border-white  mx-auto text-center">
			<p>${msg}</p>
		</div>
	`);
	
	awaitTime(1000).then(function() {		
		$('#flashMessage').remove();
	})
}

function awaitTime(delay){
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), delay);
	})
}