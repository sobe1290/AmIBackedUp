# Brings in folder1 and folder2 from the .env
param (
    [Parameter(Mandatory = $true)]
    [string]$folder1,

    [Parameter(Mandatory = $true)]
    [string]$folder2
)

# Function to compute MD5 hash of a file
function Get-FileHashMD5 {
    param (
        [Parameter(Mandatory = $true)]
        [ValidateScript({Test-Path $_ -PathType 'Leaf'})]
        [string]$FilePath
    )
    
    $fileStream = [System.IO.File]::OpenRead($FilePath)
    $md5 = [System.Security.Cryptography.MD5]::Create()
    $hashBytes = $md5.ComputeHash($fileStream)
    $fileStream.Close()
    $md5.Dispose()
    
    $hashString = [System.BitConverter]::ToString($hashBytes).Replace("-", "").ToLower()
    return $hashString
}

# Function to get all files in a folder recursively
function Get-FilesRecursively {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FolderPath
    )
    
    $files = Get-ChildItem -Path $FolderPath -Recurse | Where-Object {!$_.PSIsContainer}
    return $files
}

# Main script

# Get all files in folder 1 and compute MD5 hashes
$files1 = Get-FilesRecursively -FolderPath $folder1
$hashes1 = @{}
foreach ($file in $files1) {
    $hash = Get-FileHashMD5 -FilePath $file.FullName
    $hashes1[$hash] = $file.FullName
}

# Get all files in folder 2 and compute MD5 hashes
$files2 = Get-FilesRecursively -FolderPath $folder2
$hashes2 = @{}
foreach ($file in $files2) {
    $hash = Get-FileHashMD5 -FilePath $file.FullName
    $hashes2[$hash] = $file.FullName
}

# Compare the hashes and find unique hashes in folder 1
$uniqueHashes = $hashes1.Keys | Where-Object {!$hashes2.ContainsKey($_)}

# Print the unique hashes and their corresponding file paths
foreach ($hash in $uniqueHashes) {
    $filePath = $hashes1[$hash]
    Write-Host "Unique hash: $hash"
    Write-Host "File path: $filePath"
}