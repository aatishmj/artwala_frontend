"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useProfileCompletion } from "@/hooks"

export function ProfileCompletionCard() {
  const { completionData, loading, error } = useProfileCompletion()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !completionData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">Failed to load completion data</p>
        </CardContent>
      </Card>
    )
  }

  const { percentage, completed_fields, missing_fields, completed_count, total_fields } = completionData

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile Completion
          <Badge variant={percentage === 100 ? "default" : "secondary"}>
            {percentage}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{completed_count} of {total_fields} completed</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        {completed_fields.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Completed Fields
            </h4>
            <div className="flex flex-wrap gap-1">
              {completed_fields.map((field) => (
                <Badge 
                  key={field.field} 
                  variant="outline" 
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  {field.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {missing_fields.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Missing Fields
            </h4>
            <div className="flex flex-wrap gap-1">
              {missing_fields.map((field) => (
                <Badge 
                  key={field.field} 
                  variant="outline" 
                  className="text-xs bg-amber-50 text-amber-700 border-amber-200"
                >
                  {field.label}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Complete these fields to improve your profile visibility
            </p>
          </div>
        )}

        {percentage === 100 && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              🎉 Your profile is complete!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
