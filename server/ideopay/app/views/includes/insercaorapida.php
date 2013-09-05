<div class="span12" id="nova-receita-form">
	<div class="page-header position-relative">
		<h4> Nova receita </h4>
	</div>
	<form class="form-horizontal">
		<!--<legend>Form</legend>-->

		<div class="control-group">
			<label class="control-label" for="form-field-1">Título</label>

			<div class="controls">
				<input type="text" id="form-field-1" class="span6" placeholder="Nome da receita">
			</div>

			<hr>
			<label class="control-label" for="form-field-1">Serviço</label>

			<div class="controls">
				<select class="chosen-select" id="form-field-select-3" data-placeholder="Choose a Country...">
					<option value="">&nbsp;</option>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>													
				</select>
			</div>

			<hr>
			<label class="control-label" for="form-field-1">Cliente</label>

			<div class="controls">
				<select class="chosen-select" id="form-field-select-3" data-placeholder="Choose a Country...">
					<option value="">&nbsp;</option>
					<option value="AL">Sunati</option>
					<option value="AK">Camarido</option>													
				</select>
			</div>

			<hr>

			<label class="control-label" for="form-field-1">Valor</label>

			<div class="controls">
				<input type="text" id="form-field-1" class="span6" placeholder="Indique o valor a receber.">
			</div>

		</div>
		<hr>

		<div class="control-group">
			<label class="control-label">Prestações</label>

			<div class="controls">
				<label>
					<input name="recorrente-check" id="recorrente-check" type="checkbox" class="ace">
					<span class="lbl"> Sim</span>
				</label>
			</div>
		</div>

		<div class="recorrente-form" style="display:none">
			<div class="control-group">
				<label class="control-label" for="form-field-1">Meses</label>

				<div class="controls">
				<select class="select" class="span2">
					<option value="2">2</option>	
					<option value="3">3</option>
					<option value="4">4</option>	
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
				</select>
			</div>


			</div>
		</div>
		

		<div class="form-actions center">
			<button onclick="return false;" class="btn btn-small btn-success">
				Confirmar
				<i class="icon-arrow-right icon-on-right bigger-110"></i>
			</button>
		</div>
	</form>
			
</div>
