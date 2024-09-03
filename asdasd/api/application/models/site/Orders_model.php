<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders_model extends CI_Model {

	public function get($userId)
	{

		$this->db->where( 'userId' , $userId );
		$q = $this->db->get( 'orders' );
		$q = $q->result();

		return $q;		
	}

	public function create($order)
	{
		$this->db->insert('orders', $order);
	}



}

/* End of file  */
