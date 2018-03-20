<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Add the master administrator, user id of 1
        $users = [
            [
                'name' => 'Krishna',
                'email' => 'admin@admin.com',
                'password' =>app('hash')->make('1234'),
                'status' => true,
                'created_at' => Carbon::now()
            ],
            [
                'name' => 'Hari',
                'email' => 'user@user.com',
                'password' => app('hash')->make('1234'),
                'status' => true,
                'created_at' => Carbon::now()
            ],
        ];

        DB::table('users')->insert($users);
    }
}
