<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products_model extends CI_Model {

	public function get( $id = false )
	{

		if (!$id)
		{
			$q = $this->db->get( 'products' );
			$q = $q->result();
		}
		else
		{
			$this->db->where( 'id' , $id );
			$q = $this->db->get( 'products' );
			$q = $q->row();
		}

		return $q;
		
	}

	public function update($product)
	{
		$this->db->where('id', $product['id']);
		$this->db->update('products', $product);
	}

	public function create($product)
	{
		$this->db->insert('products', $product);
	}

	public function delete($product)
	{
		$this->db->where('id', $product['id']);
		$this->db->delete('products');
	}

}

/* End of file  */
/* Location: ./application/models/ */