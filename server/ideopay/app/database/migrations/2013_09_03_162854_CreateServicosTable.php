<?php

use Illuminate\Database\Migrations\Migration;

class CreateServicosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicos', function($table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->string('titulo',250);
			$table->string('descricao',6000);
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
		Schema::drop('servicos');
	}

}