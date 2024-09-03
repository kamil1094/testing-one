<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents('php://input');
		$_POST = json_decode( $post , true );	

		$this->load->model('site/Orders_model');

		$token = $this->input->post( 'token' );
		$this->jwt->decode( $token ,config_item( 'encryption_key' ) );
	}

	public function create()
	{


		$payload = $this->input->post('payload');
		unset($payload['role']);
		$data = $payload;
		$items = $this->input->post('items');
		$items = json_encode($items);

		$data['items'] = $items;
		$data['total'] = $this->input->post('total');

		$this->Orders_model->create($data);
	}

	public function get()
	{
		$payload = $this->input->post('payload');
		$userId = $payload['userId'];

		$output = $this->Orders_model->get($userId);
		echo json_encode($output);
	}

}

/* End of file Products.php */
/* Location: ./application/controllers/Products.php */