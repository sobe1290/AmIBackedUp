# Prompt user for the folder path
$folderPath = Read-Host "Enter the folder path"

# Get the list of items (files and subfolders) in the specified folder
$items = Get-ChildItem -Path $folderPath

# Initialize the output array for CSV
$csvOutput = @()

# Initialize counters for total files and total size
$totalFiles = 0
$totalSize = 0

# Loop through each item in the folder
foreach ($item in $items) {
    # Check if the item is a file
    if ($item -is [System.IO.FileInfo]) {
        $totalFiles++
        $totalSize += $item.Length

        # Add information about the file to the CSV output array
        $csvOutput += [PSCustomObject]@{
            Name = $item.Name
            SizeGB = [math]::Round(($item.Length / 1GB), 2)
            SizeMB = [math]::Round(($item.Length / 1MB), 2)
        }
    }
    # Check if the item is a directory
    elseif ($item -is [System.IO.DirectoryInfo]) {
        # Count the directory itself
        $totalFiles++
        $directorySize = Get-ChildItem -Path $item.FullName -Recurse -File | Measure-Object -Property Length -Sum
        $totalSize += $directorySize.Sum

        # Add information about the directory to the CSV output array
        $csvOutput += [PSCustomObject]@{
            Name = $item.Name
            SizeGB = [math]::Round(($directorySize.Sum / 1GB), 2)
            SizeMB = [math]::Round(($directorySize.Sum / 1MB), 2)
        }
    }
}

# Create a CSV file path based on the current date and time
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$csvFileName = "ItemList_$timestamp.csv"
$csvFilePath = Join-Path -Path $PSScriptRoot -ChildPath $csvFileName

# Export the CSV output array to a CSV file
$csvOutput | Export-Csv -Path $csvFilePath -NoTypeInformation

# Display a message with the CSV file path
Write-Host "CSV item list saved to: $csvFilePath"

# Display the total file count and total size in the PowerShell terminal
Write-Host "Total Files and Directories: $totalFiles"
Write-Host ("Total Size: {0:N2} GB" -f ($totalSize / 1GB))

# Create a text file path based on the current date and time
$txtFileName = "Totals_$timestamp.txt"
$txtFilePath = Join-Path -Path $PSScriptRoot -ChildPath $txtFileName

# Create the content for the text file
$txtContent = @"
Total Files and Directories: $totalFiles
Total Size: $($totalSize / 1GB) GB
"@

# Write the content to the text file
$txtContent | Set-Content -Path $txtFilePath

# Display a message with the text file path
Write-Host "Text file with totals saved to: $txtFilePath"
