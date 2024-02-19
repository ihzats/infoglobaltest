<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Http\Requests\InventoryStoreRequest;
use Illuminate\Support\Facades\Log;


class InventoryController extends Controller
{
    public function index()
    {
        $inventoryItems = Inventory::all();

        return response()->json([
            'results' => $inventoryItems
        ], 200);
    }

    public function store(InventoryStoreRequest $request)
{
    try {
        Inventory::create([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);

        return response()->json([
            'message' => 'Inventory item successfully created.'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went wrong!'
        ], 500);
    }
}
    public function show($id)
    {
        $inventoryItem = Inventory::find($id);

        if (!$inventoryItem) {
            return response()->json([
                'message' => 'Inventory item not found.'
            ], 404);
        }

        return response()->json([
            'inventoryItem' => $inventoryItem
        ], 200);
    }

    public function update(InventoryStoreRequest $request, $id)
{
    try {
        $inventoryItem = Inventory::find($id);

        if (!$inventoryItem) {
            return response()->json([
                'message' => 'Inventory item not found.'
            ], 404);
        }

        $inventoryItem->name = $request->name;
        $inventoryItem->description = $request->description;
        $inventoryItem->quantity = $request->quantity;
        $inventoryItem->price = $request->price; // Corrected attribute name

        $inventoryItem->save();

        return response()->json([
            'message' => 'Inventory item successfully updated.'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went wrong!'
        ], 500);
    }
}

    public function destroy($id)
    {
        $inventoryItem = Inventory::find($id);

        if (!$inventoryItem) {
            return response()->json([
                'message' => 'Inventory item not found.'
            ], 404);
        }

        $inventoryItem->delete();

        return response()->json([
            'message' => 'Inventory item successfully deleted.'
        ], 200);
    }
}