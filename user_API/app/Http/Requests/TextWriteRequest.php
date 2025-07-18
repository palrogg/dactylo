<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TextWriteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|unique:books|max:255',
            'description' => 'required',
            'author' => 'required|max:100',
            'content' => 'required',
            'display_date' => 'required|date',
        ];
    }
}
