<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Support\Facades\DB;

class Group extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'group';
    const ID = 'id';
    const NAME = 'name';
    const REMARK = 'remark';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists()
    {
        return self::orderByRaw("CAST(name as UNSIGNED) ASC")
//            ->orderBy('name', 'ASC')
            ->with([
                'section'
            ])
            ->orderBy('order_no', 'desc')
            ->select('*');
    }

    public static function comboList()
    {
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::REMARK} = $data[self::REMARK];
    }

    public function section()
    {
        return $this->hasMany('App\Models\Section', 'group_id', 'id')
            ->select('*');
    }

    public static function countStudent()
    {
        $count = DB::SELECT("SELECT
                student.group_id as 'group_id',
                `group`.`name` as 'group_name',
                COUNT(student.`name`) as 'total_student'
            FROM
                student
                INNER JOIN `group` ON student.group_id = `group`.id
                WHERE `group`.user_id = :user_id
                AND `group`.deleted_at IS NULL
                GROUP BY student.group_id
                ORDER BY COUNT(student.`name`) DESC
            
        ", ['user_id' => auth()->user()->id]);
        return $count;
    }

    public static function countTime($filter = null)
    {
        $start_date = empty($filter['date_range']) ? null
            : date("Y-m-d H:i:s", strtotime($filter['date_range']['startDate']));
        $end_date = empty($filter['date_range']) ? null
            : date("Y-m-d H:i:s", strtotime($filter['date_range']['endDate']));
        $count = DB::table('group')
            ->select(
                'group.name as group_name',
                DB::raw('SUM(classing.duration) as total_time'),
                DB::raw('SUM(classing.duration) as total_hour')
            )
            ->join('classing', 'group.id', '=', 'classing.group_id')
            ->whereBetween('classing.date_time', [$start_date, $end_date])
            ->where('group.user_id', auth()->user()->id)
            ->whereNull('group.deleted_at')
            ->groupBy('classing.group_id')
            ->get();
        return $count;
    }

}
