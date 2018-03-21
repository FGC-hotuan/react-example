<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

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
