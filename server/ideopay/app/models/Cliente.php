<?php

class Cliente extends Eloquent {
	protected $guarded = array();
	protected $table = 'clientes';

	public static $rules = array();
}
