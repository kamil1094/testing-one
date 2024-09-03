<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	public function get( $id = false )
	{

		$this->db->where( 'id' , $id );
		$q = $this->db->get( 'users' );
		$q = $q->row();

		return $q;		
	}

	public function create($user)
	{
		$this->db->insert('users', $user);
	}

	public function login($email, $password)
	{
		$this->db->where('email', $email);
		$q = $this->db->get('users');
		$result = $q->row();

		if(empty($result) || $password != $result->password)
		{
			$output = false;
		}
		else
		{
			$output = $result;
		}

		return $output;


	}



}

/* End of file  */
