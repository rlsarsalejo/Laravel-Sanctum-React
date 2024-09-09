<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member; // Ensure this is the correct model
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
class ApiMemberController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:members,email',
            'address' => 'required|string|max:225',
            'role' => 'required|string',
            'phoneNumber' => 'required|min:11|max:13',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors(),
            ],422);
        }

        $member = Member::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'role' => $request->input('role'),
            'phoneNumber' => $request->input('phoneNumber'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'message' => 'Member Created Successfully',
            'data' => $member,
        ],201);
    }

    //getting all the members
    public function index()
    {
        $members = Member::all();
        return response()->json($members);
    }

    //Update Member Data
     public function update(Request $request, $id)
        {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|unique:members,email,' . $id,
                'address' => 'required|string|max:225',
                'role' => 'required|string',
                'phoneNumber' => 'required|min:11|max:13',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }

            $member = Member::find($id);
            if (!$member) {
                return response()->json([
                    'message' => 'Member not found.',
                ], 404);
            }

            $member->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
                'role' => $request->input('role'),
                'phoneNumber' => $request->input('phoneNumber'),
            ]);

            return response()->json([
                'message' => 'Member updated successfully',
                'data' => $member,
            ]);
        }
        
    // delete Member Data
    public function delete($id)
        {
            $member = Member::find($id);
            if (!$member) {
                return response()->json([
                    'message' => 'Member not found.',
                ], 404);
            }

            $member->delete();

            return response()->json([
                'message' => 'Member deleted successfully',
            ]);
        }
}
