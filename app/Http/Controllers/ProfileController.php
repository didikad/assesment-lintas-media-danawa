<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getData(){
        $data = User::findOrFail(Auth::id());

        return response()->json($data);
    }

    public function updateData(Request $request)
    {
        try {
            // $validatedData = $request->validate([
            //     'full_name' => 'required|string',
            //     'email' => 'required|email',
            // ]);
    
            $user = User::findOrFail(Auth::id());
    
            $user->update([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);
    
            return response()->json(["success" => "Berhasil Update Data"], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Gagal Update Data: " . $e->getMessage()], 500);
        }
    }
    
}
