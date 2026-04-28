import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { MoreHorizontal, ArrowUpDown, Download, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/DropdownMenu";

export function TablePage() {
  const invoices = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
    { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
    { id: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
    { id: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
  ];

  const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  ];

  return (
    <ComponentShowcase
      title="Table"
      description="A responsive table component for displaying data in rows and columns."
      category="Data Display"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <div className="rounded-md border w-full">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 5).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium font-mono tabular-nums">{invoice.id}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        invoice.status === "Paid" ? "success-soft-outline" : 
                        invoice.status === "Pending" ? "warning-soft-outline" : 
                        "destructive-soft-outline"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      
      // Main Code
      code={`import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export function TableDemo() {
  const invoices = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to customize the table",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Table content (TableHeader, TableBody, TableFooter, TableCaption)",
          required: true,
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Footer",
          description: "Table with footer for totals",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 5).map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium font-mono tabular-nums">{invoice.id}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === "Paid" ? "success-soft-outline" : invoice.status === "Pending" ? "warning-soft-outline" : "destructive-soft-outline"}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{invoice.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">$1,750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Data rows */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={1}>Total</TableCell>
      <TableCell className="text-right">$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`
        },
        {
          title: "With Actions",
          description: "Table with actions per row using Dropdown Menu",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit user</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell>{user.name}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`
        },
        {
          title: "Compact Table",
          description: "Table with more compact rows",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-8">ID</TableHead>
                    <TableHead className="h-8">Status</TableHead>
                    <TableHead className="h-8 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 4).map((invoice) => (
                    <TableRow key={invoice.id} className="h-8">
                      <TableCell className="py-2 font-medium">{invoice.id}</TableCell>
                      <TableCell className="py-2">
                        <Badge 
                          variant={
                            invoice.status === "Paid" ? "success-soft-outline" : 
                            invoice.status === "Pending" ? "warning-soft-outline" : 
                            "destructive-soft-outline"
                          } 
                          className="text-xs"
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 text-right">{invoice.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="h-8">ID</TableHead>
      <TableHead className="h-8">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id} className="h-8">
        <TableCell className="py-2">{item.id}</TableCell>
        <TableCell className="py-2">{item.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`
        },
        {
          title: "Striped Rows",
          description: "Table with alternating rows for better readability",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow 
                      key={invoice.id}
                      className={index % 2 === 0 ? "bg-muted" : ""}
                    >
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.method}</TableCell>
                      <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item, index) => (
      <TableRow 
        key={item.id}
        className={index % 2 === 0 ? "bg-muted" : ""}
      >
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`
        },
        {
          title: "Hoverable Rows",
          description: "Table with hover effect on rows",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow 
                      key={user.email}
                      className="hover:bg-muted cursor-pointer transition-colors"
                    >
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === "Active" ? "success-soft-outline" : "warning-soft-outline"}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableBody>
    {users.map((user) => (
      <TableRow 
        key={user.id}
        className="hover:bg-muted cursor-pointer transition-colors"
      >
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`
        },
        {
          title: "With Icon Buttons",
          description: "Table with quick action buttons",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Annual Report 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <FileText className="size-3" />
                        PDF
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Q4 Financial Summary</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <FileText className="size-3" />
                        PDF
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableBody>
    <TableRow>
      <TableCell>Document Name</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm">
            <Download className="size-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`
        },
        {
          title: "Sortable Headers",
          description: "Table with sortable headers (visual)",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" className="h-8 px-2 lg:px-3">
                        Invoice
                        <ArrowUpDown className="ml-2 size-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="h-8 px-2 lg:px-3">
                        Status
                        <ArrowUpDown className="ml-2 size-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button variant="ghost" className="h-8 px-2 lg:px-3">
                        Amount
                        <ArrowUpDown className="ml-2 size-4" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 4).map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            invoice.status === "Paid" ? "success-soft-outline" : 
                            invoice.status === "Pending" ? "warning-soft-outline" : 
                            "destructive-soft-outline"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
          code: `import { ArrowUpDown } from "lucide-react";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Button variant="ghost" onClick={() => handleSort('invoice')}>
          Invoice
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      </TableHead>
      <TableHead>
        <Button variant="ghost" onClick={() => handleSort('amount')}>
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      </TableHead>
    </TableRow>
  </TableHeader>
</Table>`
        },
        {
          title: "Empty State",
          description: "Table showing empty state when there is no data",
          preview: (
            <div className="rounded-md border w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="size-8 mb-2" />
                        <p>No invoices found.</p>
                        <p className="text-sm">Create your first invoice to get started.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.length === 0 ? (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          <div className="flex flex-col items-center text-muted-foreground">
            <FileText className="size-8 mb-2" />
            <p>No data found.</p>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      data.map((item) => <TableRow key={item.id}>...</TableRow>)
    )}
  </TableBody>
</Table>`
        }
      ]}
    />
  );
}