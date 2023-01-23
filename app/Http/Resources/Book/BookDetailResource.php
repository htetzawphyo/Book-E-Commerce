<?php

namespace App\Http\Resources\Book;

use Illuminate\Http\Resources\Json\JsonResource;

class BookDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'author_name' => optional($this->author)->name ?? 'Unknown User',
            'author_id' => optional($this->author)->id ?? 'Unknown User',
            'image' => $this->image ? asset('storage/media/' . $this->image) : null,
        ];
    }
}
