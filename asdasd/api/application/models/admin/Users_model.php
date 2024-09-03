<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users_model extends CI_Model {

	public function get( $id = false )
	{

		if (!$id)
		{
			$q = $this->db->get( 'users' );
			$q = $q->result();
		}
		else
		{
			$this->db->where( 'id' , $id );
			$q = $this->db->get( 'users' );
			$q = $q->row();
		}

		return $q;
		
	}

	public function update($user)
	{
		$this->db->where('id', $user['id']);
		$this->db->update('users', $user);
	}

	public function create($user)
	{
		$this->db->insert('users', $user);
	}

	public function delete($user)
	{
		$this->db->where('id', $user['id']);
		$this->db->delete('users');
	}

	public function get_unique($id, $email)
	{
		$this->db->where('email', $email);
		$this->db->where('id !=', $id);
		$q = $this->db->get('users');

		return $q->row();
	}

}

/* End of file  */
/* Location: ./application/models/ */