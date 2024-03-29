<div id="despesas-page-js" style="display:none">
	<div class="page-header position-relative">
		<h1>
			Contas
			<small>
				<i class="icon-double-angle-right"></i>
				Despesas
			</small>
		</h1>
	</div><!--/.page-header-->

	<div class="row-fluid">
		<div class="span12">

			<h3 class="header smaller lighter green">Informação</h3>

			<div class="progress progress-purple progress-striped" data-percent="20% pago">
				<div class="bar" style="width:20%;"></div>
			</div>

			<div class="infobox-container">
				
					<div class="infobox infobox-blue infobox-small infobox-dark">
						<div class="infobox-icon">
							<i class="icon-asterisk"></i>
						</div>
						<div class="infobox-data">
							<div class="infobox-content">Total</div>
							<div class="infobox-content">5300 €</div>
						</div>
					</div>

					<div class="infobox infobox-green infobox-small infobox-dark">
						<div class="infobox-icon">
							<i class="icon-check"></i>
						</div>

						<div class="infobox-data">
							<div class="infobox-content">Pago</div>
							<div class="infobox-content">4000 €</div>
						</div>
					</div>

					<div class="infobox infobox-grey infobox-small infobox-dark">
						<div class="infobox-icon">
							<i class="icon-check-empty"></i>
						</div>

						<div class="infobox-data">
							<div class="infobox-content">Por pagar</div>
							<div class="infobox-content">1300 €</div>
						</div>
					</div>
				</div>


			<h3 class="header smaller lighter blue">Listagem</h3>

			<p><button class="btn btn-success btn-block"> <i class="icon-plus"></i> Nova despesa </button></p>

			<div class="row-fluid">
				<div class="table-header">
					Despesas Setembro 2013
				</div>

				<table id="despesas-table" class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th class="center">
								<label>
									<input type="checkbox" class="ace" />
									<span class="lbl"></span>
								</label>
							</th>
							<th>Título</th>
							<th>Valor</th>
							<th class="hidden-480">Tipo de Serviço</th>

							<th class="hidden-phone">
								<i class="icon-time bigger-110 hidden-phone"></i>
								Limite pagamento
							</th>
							<th class="hidden-480">Estado</th>

							<th></th>
						</tr>
					</thead>

					<tbody>

						<% _.each(despesas, function(r) { %>
						<tr>
							<td class="center">
								<label>
									<input type="checkbox" class="ace" />
									<span class="lbl"></span>
								</label>
							</td>

							<td>
								<a href="#"><%= r.nome %></a>
							</td>

							<td><%= r.valor %></td>

							<td class="hidden-480"><%= r.servico %></td>
							<td class="hidden-phone"><%= r.date %></td>

							<td class="hidden-480">
								<span class="label label-success"><%= r.estado %></span>
							</td>

							<td>
								<div class="hidden-phone visible-desktop action-buttons">
									<a class="blue" href="#">
										<i class="icon-zoom-in bigger-130"></i>
									</a>

									<a class="green" href="#">
										<i class="icon-pencil bigger-130"></i>
									</a>

									<a class="red" href="#">
										<i class="icon-trash bigger-130"></i>
									</a>
								</div>

								<div class="hidden-desktop visible-phone">
									<div class="inline position-relative">
										<button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown">
											<i class="icon-caret-down icon-only bigger-120"></i>
										</button>

										<ul class="dropdown-menu dropdown-icon-only dropdown-yellow pull-right dropdown-caret dropdown-close">
											<li>
												<a href="#" class="tooltip-info" data-rel="tooltip" title="View">
													<span class="blue">
														<i class="icon-zoom-in bigger-120"></i>
													</span>
												</a>
											</li>

											<li>
												<a href="#" class="tooltip-success" data-rel="tooltip" title="Edit">
													<span class="green">
														<i class="icon-edit bigger-120"></i>
													</span>
												</a>
											</li>

											<li>
												<a href="#" class="tooltip-error" data-rel="tooltip" title="Delete">
													<span class="red">
														<i class="icon-trash bigger-120"></i>
													</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</td>
						</tr>
						<% }) %>
					</tbody>
				</table>
			</div> <!-- row fluid -->
		</div><!-- span -->
	</div><!--/.row-fluid-->
</div>

