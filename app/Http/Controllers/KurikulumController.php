<?php

namespace App\Http\Controllers;

use App\Models\Kurikulum;
use Inertia\Response;

class KurikulumController extends Controller
{
    public function index(): Response
    {
        $kurikulum = Kurikulum::all();

        $props = [
            'kurikulum' => $kurikulum,
        ];

        return inertia("Curriculum/index", $props);
    }
}
