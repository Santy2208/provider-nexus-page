import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Cloud, 
  Key, 
  Shield, 
  Info, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  Database,
  Settings,
  Globe
} from "lucide-react";

interface ConnectionDialogProps {
  provider: "aws" | "azure" | "gcp" | "oracle";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (connectionData: any) => void;
}

const providerConfigs = {
  aws: {
    name: "Amazon Web Services",
    icon: <Cloud className="h-5 w-5" />,
    color: "aws",
    defaultRegions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
  },
  azure: {
    name: "Microsoft Azure", 
    icon: <Database className="h-5 w-5" />,
    color: "azure",
    defaultRegions: ["East US", "West Europe", "Southeast Asia", "Australia East"],
  },
  gcp: {
    name: "Google Cloud Platform",
    icon: <Settings className="h-5 w-5" />,
    color: "gcp", 
    defaultRegions: ["us-central1", "europe-west1", "asia-southeast1", "australia-southeast1"],
  },
  oracle: {
    name: "Oracle Cloud",
    icon: <Globe className="h-5 w-5" />,
    color: "oracle",
    defaultRegions: ["us-phoenix-1", "eu-frankfurt-1", "ap-tokyo-1", "uk-london-1"],
  },
};

export function ConnectionDialog({ provider, open, onOpenChange, onConnect }: ConnectionDialogProps) {
  const config = providerConfigs[provider];
  const { toast } = useToast();
  
  const [connectionData, setConnectionData] = useState({
    handle: "",
    regions: [] as string[],
    accessMode: "cross-account",
    roleName: "",
    externalId: "",
    roleArn: "",
    accountId: "",
    subscriptionId: "",
    tenantId: "",
    clientId: "",
    clientSecret: "",
    projectId: "",
    serviceAccountKey: "",
    compartmentId: "",
    userOcid: "",
    fingerprint: "",
    privateKey: "",
    tenancy: "",
    region: "",
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const updateField = (field: string, value: any) => {
    setConnectionData(prev => ({ ...prev, [field]: value }));
  };

  const toggleRegion = (region: string) => {
    setConnectionData(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  const handleConnect = async () => {
    if (!connectionData.handle) {
      toast({
        title: "Handle required",
        description: "Please provide a handle for this connection.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
    
    toast({
      title: "Connection successful!",
      description: `${config.name} has been connected successfully.`,
    });
    
    onConnect(connectionData);
    onOpenChange(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  const renderAWSForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="handle">Handle *</Label>
          <Input
            id="handle"
            placeholder="my-aws-connection"
            value={connectionData.handle}
            onChange={(e) => updateField("handle", e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1">
            A unique handle for this connection. Don't worry, you can change this later!
          </p>
        </div>

        <div>
          <Label>Regions</Label>
          <Select 
            value={connectionData.regions.length > 0 ? "custom" : ""}
            onValueChange={(value) => {
              if (value === "all") {
                updateField("regions", config.defaultRegions);
              } else if (value === "none") {
                updateField("regions", []);
              }
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue 
                placeholder={
                  connectionData.regions.length === 0 
                    ? "Select regions" 
                    : connectionData.regions.length === config.defaultRegions.length
                    ? "All regions selected"
                    : `${connectionData.regions.length} regions selected`
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select All Regions</SelectItem>
              <SelectItem value="none">Clear Selection</SelectItem>
              <div className="px-2 py-1">
                <Label className="text-xs text-muted-foreground">Individual Regions:</Label>
              </div>
              {config.defaultRegions.map((region) => (
                <div key={region} className="flex items-center space-x-2 px-2 py-1 hover:bg-accent rounded-sm cursor-pointer"
                     onClick={() => toggleRegion(region)}>
                  <Checkbox
                    checked={connectionData.regions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <span className="text-sm">{region}</span>
                </div>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            Select multiple regions for better coverage and performance.
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Set up trust relationship</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          To avoid the use of long-term access keys, we support the use of temporary session credentials. To enable 
          this we assume a role in your account with cross account trust to our account.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">1. Role Name *</Label>
            <Input
              id="roleName"
              placeholder="AlterPilotRole"
              value={connectionData.roleName}
              onChange={(e) => updateField("roleName", e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              This is the name of the role that will be created in your AWS account.
            </p>
          </div>

          <div>
            <Label htmlFor="externalId">2. External ID</Label>
            <div className="flex space-x-2">
              <Input
                id="externalId"
                value={connectionData.externalId || "cs-ext-12345678-abcd-1234-efgh-123456789012"}
                onChange={(e) => updateField("externalId", e.target.value)}
                readOnly
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(connectionData.externalId || "cs-ext-12345678-abcd-1234-efgh-123456789012", "External ID")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The External ID is a security measure that helps prevent unauthorized access. It consists of two parts:
            </p>
            <ul className="text-sm text-muted-foreground mt-1 ml-4 list-disc">
              <li>Your organization ID (automatically added)</li>
              <li>A random string (you can customize this)</li>
            </ul>
          </div>

          <div>
            <Label htmlFor="accountId">3. AWS Account ID *</Label>
            <Input
              id="accountId"
              placeholder="123456789012"
              value={connectionData.accountId}
              onChange={(e) => updateField("accountId", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="roleArn">4. Role ARN *</Label>
            <Input
              id="roleArn"
              placeholder="arn:aws:iam::123456789012:role/AlterPilotRole"
              value={connectionData.roleArn}
              onChange={(e) => updateField("roleArn", e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              The ARN of the created role.
            </p>
          </div>
        </div>

        <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Need help setting up the role?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Download and run either the Terraform plan or CloudFormation template to create the IAM role in 
                the management account or delegated account.
              </p>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Terraform Template
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  CloudFormation Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAzureForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="handle">Handle *</Label>
          <Input
            id="handle"
            placeholder="my-azure-connection"
            value={connectionData.handle}
            onChange={(e) => updateField("handle", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="subscriptionId">Subscription ID *</Label>
          <Input
            id="subscriptionId"
            placeholder="12345678-1234-1234-1234-123456789012"
            value={connectionData.subscriptionId}
            onChange={(e) => updateField("subscriptionId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tenantId">Tenant ID *</Label>
          <Input
            id="tenantId"
            placeholder="87654321-4321-4321-4321-210987654321"
            value={connectionData.tenantId}
            onChange={(e) => updateField("tenantId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="clientId">Application (Client) ID *</Label>
          <Input
            id="clientId"
            placeholder="abcd1234-ab12-cd34-ef56-123456789012"
            value={connectionData.clientId}
            onChange={(e) => updateField("clientId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="clientSecret">Client Secret *</Label>
          <Input
            id="clientSecret"
            type="password"
            placeholder="Your client secret value"
            value={connectionData.clientSecret}
            onChange={(e) => updateField("clientSecret", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderGCPForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="handle">Handle *</Label>
          <Input
            id="handle"
            placeholder="my-gcp-connection"
            value={connectionData.handle}
            onChange={(e) => updateField("handle", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="projectId">Project ID *</Label>
          <Input
            id="projectId"
            placeholder="my-gcp-project-123456"
            value={connectionData.projectId}
            onChange={(e) => updateField("projectId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="serviceAccountKey">Service Account Key (JSON) *</Label>
          <Textarea
            id="serviceAccountKey"
            placeholder="Paste your service account key JSON here..."
            value={connectionData.serviceAccountKey}
            onChange={(e) => updateField("serviceAccountKey", e.target.value)}
            rows={8}
          />
        </div>
      </div>
    </div>
  );

  const renderOracleForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="handle">Handle *</Label>
          <Input
            id="handle"
            placeholder="my-oracle-connection"
            value={connectionData.handle}
            onChange={(e) => updateField("handle", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tenancy">Tenancy OCID *</Label>
          <Input
            id="tenancy"
            placeholder="ocid1.tenancy.oc1..aaaaaaaaxxxxxx"
            value={connectionData.tenancy}
            onChange={(e) => updateField("tenancy", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="userOcid">User OCID *</Label>
          <Input
            id="userOcid"
            placeholder="ocid1.user.oc1..aaaaaaaaxxxxxx"
            value={connectionData.userOcid}
            onChange={(e) => updateField("userOcid", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="fingerprint">Key Fingerprint *</Label>
          <Input
            id="fingerprint"
            placeholder="12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef"
            value={connectionData.fingerprint}
            onChange={(e) => updateField("fingerprint", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="region">Region *</Label>
          <Select value={connectionData.region} onValueChange={(value) => updateField("region", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {config.defaultRegions.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="privateKey">Private Key *</Label>
          <Textarea
            id="privateKey"
            placeholder="-----BEGIN PRIVATE KEY-----
Your private key content here...
-----END PRIVATE KEY-----"
            value={connectionData.privateKey}
            onChange={(e) => updateField("privateKey", e.target.value)}
            rows={8}
          />
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (provider) {
      case "aws": return renderAWSForm();
      case "azure": return renderAzureForm();
      case "gcp": return renderGCPForm();
      case "oracle": return renderOracleForm();
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${config.color}`}>
              {config.icon}
            </div>
            <div>
              <DialogTitle className="text-xl">Connect {config.name}</DialogTitle>
              <DialogDescription>
                Configure your {config.name} connection settings
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection" className="space-y-6 mt-6">
            {renderForm()}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="autoSync" />
                <Label htmlFor="autoSync">Enable automatic synchronization</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="costOptimization" defaultChecked />
                <Label htmlFor="costOptimization">Enable cost optimization recommendations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="securityMonitoring" defaultChecked />
                <Label htmlFor="securityMonitoring">Enable security monitoring</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={config.color as any} 
            onClick={handleConnect}
            disabled={isConnecting || !connectionData.handle}
          >
            {isConnecting ? (
              <>
                <Cloud className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Connect {config.name}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}