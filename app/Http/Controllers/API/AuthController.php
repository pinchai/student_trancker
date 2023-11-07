<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Admin\ProductUnitVariationController;
use App\Http\Controllers\Controller;
use App\Models\CustomerAuth;
use App\Models\ProductUnitVariation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    private $expiry_in = null;
    public function __construct() {
        $this->middleware('auth:mobile', ['except' => ['login', 'register']]);
        $this->expiry_in = Carbon::now()->addYears(15)->timestamp;
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $credentials = $request->only(['email', 'password']);
        //if (!$token = Auth::attempt($credentials, ['exp' => Carbon::now()->addDays(1)->timestamp])) {
        if (!$token = auth('mobile')->attempt($credentials, ['exp' => Carbon::now()->addDays(1)->timestamp])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:customer_auth',
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = CustomerAuth::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function logout() {
        auth('mobile')->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile() {
        //$data = CustomerAuth::all();
        $data = ProductUnitVariation::listForPOSAndPurchase();
        return  $this->responseWithData($data);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->expiry_in,
            'user' => auth()->user()
        ]);
    }
}
