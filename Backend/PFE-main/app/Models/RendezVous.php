<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
{
    use HasFactory;
    protected $fillable=['cin','date_rdv','temp_dep','nom','prenom','genre','num_tel','date_naissance','id_ser'];
}
