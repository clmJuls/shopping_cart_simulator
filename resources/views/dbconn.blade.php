<!DOCTYPE html>
<html>
<head>
    <title>Database Connection</title>
</head>
<body>
    <div>
      <?php
        use Illuminate\Support\Facades\DB;

        try {
            DB::connection()->getPdo();
            echo "Connected to the database successfully!";
        } catch (\Exception $e) {
            echo "Failed to connect to the database: " . $e->getMessage();
        }
      ?>
    </div>
</body>
</html>