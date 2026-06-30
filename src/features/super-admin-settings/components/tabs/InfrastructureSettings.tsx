import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function InfrastructureSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Infrastructure</h2>
        <p className="text-slate-500 mt-1">Configure storage, caching, and background queues.</p>
      </div>

      <SettingsSection title="Storage & File Uploads" description="Where and how user files are stored.">
        <SettingsRow title="Storage Provider" description="Select where to store uploaded files.">
          <Select defaultValue="s3">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Server Storage</SelectItem>
              <SelectItem value="s3">AWS S3</SelectItem>
              <SelectItem value="gcs">Google Cloud Storage</SelectItem>
              <SelectItem value="cloudinary">Cloudinary</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow title="Max Upload Size (MB)" description="Maximum file size allowed per upload.">
          <Input type="number" defaultValue="25" className="w-24" />
        </SettingsRow>
        <SettingsRow title="Allowed Extensions" description="Comma separated list of allowed file types.">
          <Input defaultValue="pdf,doc,docx,jpg,png,jpeg" />
        </SettingsRow>
        <SettingsRow title="File Processing" description="Automated actions during file upload.">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="imageCompression" defaultChecked />
              <label htmlFor="imageCompression" className="text-sm font-medium leading-none">Enable image compression</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="virusScan" />
              <label htmlFor="virusScan" className="text-sm font-medium leading-none">Enable virus scanning (Requires ClamAV)</label>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Cache Management" description="Optimize application performance.">
        <SettingsRow title="Cache Driver" description="Backend used for caching data.">
          <Select defaultValue="redis">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redis">Redis</SelectItem>
              <SelectItem value="memcached">Memcached</SelectItem>
              <SelectItem value="file">File (Not recommended)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow title="Redis Host">
          <Input defaultValue="127.0.0.1" />
        </SettingsRow>
        <SettingsRow title="Redis Port">
          <Input type="number" defaultValue="6379" className="w-24" />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Queue Management" description="Background job processing.">
        <SettingsRow title="Queue Driver">
          <Select defaultValue="redis">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redis">Redis (BullMQ)</SelectItem>
              <SelectItem value="sqs">AWS SQS</SelectItem>
              <SelectItem value="sync">Sync (For testing only)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
