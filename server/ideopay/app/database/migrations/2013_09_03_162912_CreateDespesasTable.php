<?php

use Illuminate\Database\Migrations\Migration;

class CreateDespesasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('despesas', function($table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('servico_id');
			$table->string('titulo',250);
			$table->string('descricao',6000);
			$table->datetime('data_limite');
			$table->integer('pago');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('despesas');
	}

}