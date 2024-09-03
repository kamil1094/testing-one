<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents('php://input');
		$_POST = json_decode( $post , true );	

		$this->load->model('site/Products_model');	

	}

	public function get($id = false)
	{
		
		$output = $this->Products_model->get($id);
		echo json_encode( $output );
	}

	public function getImages( $id )
	{
	    $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
	    $basePath = $basePath . $id . DIRECTORY_SEPARATOR;

	    if ( !is_dir( $basePath ) )
	    	return;

	    $files = scandir( $basePath );
	    $files = array_diff( $files , array( '.' , '..' ) );

	    $newFiles = array();
	    foreach ( $files as $file )
	    {
	    	$newFiles[] .= $file;
	    }

	    echo json_encode( $newFiles );

	}

}

/* End of file Products.php */
/* Location: ./application/controllers/Products.php */