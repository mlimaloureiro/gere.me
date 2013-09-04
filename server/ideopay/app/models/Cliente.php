<?php

class Cliente extends Eloquent {
	protected $guarded = array();
	protected $table = 'clientes';
	public $timestamps = false;
	public static $rules = array();


	public function receitas() {
		return $this->hasMany('Receita');
	}

	
}
