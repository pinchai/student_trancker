<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use Validator;

class CustomerController extends Controller
{
    public function getCustomer(){
        $data = Customer::all();
        return  $this->responseWithData($data);
    }

    public function storeCustomer($name, $gender){
        dd($name, $gender);
    }

    public function updateCustomer($id, $name, $gender){
        dd($id, $name, $gender);
    }

    public function deleteCustomer($id){
        dd('customer id: '.$id);
    }

}
