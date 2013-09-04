<?php

class Despesa extends Eloquent {
	protected $guarded = array();
	protected $table = 'despesas';
	public static $rules = array();
	public $timestamps = false;

	public function servico() {
		return $this->hasOne('Servico');
	}
}
