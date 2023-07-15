param (
    [Parameter(Mandatory=$true)]
    [String]$FolderPath
)

$Files = Get-ChildItem -Path $FolderPath -Recurse | Where-Object { -not $_.PSIsContainer }

$Hasher = [System.Security.Cryptography.MD5]::Create()

foreach ($File in $Files) {
    $FileStream = [System.IO.File]::OpenRead($File.FullName)
    $HashBytes = $Hasher.ComputeHash($FileStream)
    $FileStream.Close()
    $FileHash = [System.BitConverter]::ToString($HashBytes) -replace '-', ''
    Write-Output "$FileHash  $($File.FullName)"
}
