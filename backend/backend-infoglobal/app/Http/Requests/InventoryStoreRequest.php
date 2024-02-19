<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|integer|min:0',
            // Add other rules for additional fields
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required!',
            'quantity.required' => 'Quantity is required!',
        ];
    }
}